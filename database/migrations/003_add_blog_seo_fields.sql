ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT;

CREATE INDEX IF NOT EXISTS idx_blog_posts_meta_title ON blog_posts(meta_title);