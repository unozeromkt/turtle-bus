import { supabaseAdmin } from '../supabase-admin'

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string | null
  content: string | null
  featured_image: string | null
  author: string | null
  meta_title: string | null
  meta_description: string | null
  status: 'draft' | 'published' | 'archived'
  is_published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export function getBlogPostReadTime(content: string | null) {
  const plainText = (content || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  const wordCount = plainText ? plainText.split(' ').length : 0
  const minutes = Math.max(1, Math.ceil(wordCount / 220))

  return `${minutes} min`
}

export async function getAllBlogPosts() {
  try {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .is('deleted_at', null)
      .order('updated_at', { ascending: false })

    if (error) throw error
    return data as BlogPost[]
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    throw error
  }
}

export async function getPublishedBlogPosts(limit?: number) {
  try {
    let query = supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .eq('status', 'published')
      .is('deleted_at', null)
      .order('published_at', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) throw error
    return data as BlogPost[]
  } catch (error) {
    console.error('Error fetching published blog posts:', error)
    throw error
  }
}

export async function getBlogPostById(id: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single()

    if (error) throw error
    return data as BlogPost
  } catch (error) {
    console.error(`Error fetching blog post ${id}:`, error)
    throw error
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .eq('status', 'published')
      .is('deleted_at', null)
      .single()

    if (error) throw error
    return data as BlogPost
  } catch (error) {
    console.error(`Error fetching published blog post ${slug}:`, error)
    throw error
  }
}

export async function createBlogPost(blogPostData: Partial<BlogPost>) {
  try {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .insert([
        {
          ...blogPostData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) throw error
    return data as BlogPost
  } catch (error) {
    console.error('Error creating blog post:', error)
    throw error
  }
}

export async function updateBlogPost(blogPostId: string, blogPostData: Partial<BlogPost>) {
  try {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .update({
        ...blogPostData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', blogPostId)
      .is('deleted_at', null)
      .select()
      .single()

    if (error) throw error
    return data as BlogPost
  } catch (error) {
    console.error('Error updating blog post:', error)
    throw error
  }
}

export async function deleteBlogPost(blogPostId: string) {
  try {
    const { error } = await supabaseAdmin
      .from('blog_posts')
      .update({
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', blogPostId)

    if (error) throw error
    return true
  } catch (error) {
    console.error('Error deleting blog post:', error)
    throw error
  }
}
