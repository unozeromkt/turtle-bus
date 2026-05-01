'use server'

import { revalidatePath } from 'next/cache'
import { supabaseAdmin } from '@/lib/supabase-admin'
import {
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  type BlogPost,
} from '@/lib/db/blog-posts'

function buildBlogPostPayload(formData: FormData) {
  const status = String(formData.get('status') || 'draft') as BlogPost['status']
  const existingPublishedAt = String(formData.get('publishedAt') || '').trim()
  const isPublished = status === 'published'

  return {
    slug: String(formData.get('slug') || '').trim(),
    title: String(formData.get('title') || '').trim(),
    excerpt: String(formData.get('excerpt') || '').trim() || null,
    content: String(formData.get('content') || '').trim() || null,
    featured_image: String(formData.get('featuredImage') || '').trim() || null,
    author: String(formData.get('author') || '').trim() || null,
    meta_title: String(formData.get('metaTitle') || '').trim() || null,
    meta_description: String(formData.get('metaDescription') || '').trim() || null,
    status,
    is_published: isPublished,
    published_at: isPublished ? existingPublishedAt || new Date().toISOString() : null,
  } satisfies Partial<BlogPost>
}

async function slugExists(slug: string, excludedId?: string) {
  let query = supabaseAdmin
    .from('blog_posts')
    .select('id')
    .eq('slug', slug)
    .is('deleted_at', null)

  if (excludedId) {
    query = query.neq('id', excludedId)
  }

  const { data, error } = await query.maybeSingle()

  if (error) throw error
  return Boolean(data)
}

export async function createBlogPostAction(formData: FormData) {
  try {
    const payload = buildBlogPostPayload(formData)

    if (!payload.title || !payload.slug) {
      return { success: false, message: 'Título y slug son requeridos' }
    }

    if (await slugExists(payload.slug)) {
      return { success: false, message: `Ya existe un blog con el slug "${payload.slug}"` }
    }

    const createdPost = await createBlogPost(payload)

    revalidatePath('/admin/blog')
    revalidatePath('/blog')
    revalidatePath(`/blog/${createdPost.slug}`)
    revalidatePath('/')

    return { success: true, data: createdPost, message: 'Blog creado exitosamente' }
  } catch (error) {
    console.error('Error creating blog post:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al crear el blog',
      message: 'No se pudo crear el blog',
    }
  }
}

export async function updateBlogPostAction(blogPostId: string, formData: FormData) {
  try {
    const payload = buildBlogPostPayload(formData)
    const previousSlug = String(formData.get('previousSlug') || '').trim()

    if (!payload.title || !payload.slug) {
      return { success: false, message: 'Título y slug son requeridos' }
    }

    if (await slugExists(payload.slug, blogPostId)) {
      return { success: false, message: `Ya existe otro blog con el slug "${payload.slug}"` }
    }

    const updatedPost = await updateBlogPost(blogPostId, payload)

    revalidatePath('/admin/blog')
    revalidatePath('/blog')
    revalidatePath('/')
    if (previousSlug) {
      revalidatePath(`/blog/${previousSlug}`)
    }
    revalidatePath(`/blog/${updatedPost.slug}`)

    return { success: true, data: updatedPost, message: 'Blog actualizado exitosamente' }
  } catch (error) {
    console.error('Error updating blog post:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al actualizar el blog',
      message: 'No se pudo actualizar el blog',
    }
  }
}

export async function deleteBlogPostAction(blogPostId: string, slug: string) {
  try {
    await deleteBlogPost(blogPostId)

    revalidatePath('/admin/blog')
    revalidatePath('/blog')
    revalidatePath(`/blog/${slug}`)
    revalidatePath('/')

    return { success: true, message: 'Blog eliminado exitosamente' }
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al eliminar el blog',
      message: 'No se pudo eliminar el blog',
    }
  }
}
