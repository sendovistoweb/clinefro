import { useParams, Navigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useStaticPageBySlug } from "@/hooks/useStaticPages";

export default function StaticPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: page, isLoading, error } = useStaticPageBySlug(slug || "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Carregando página...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !page) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto">
          {page.featured_image_url && (
            <div className="mb-8">
              <img
                src={page.featured_image_url}
                alt={page.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
          
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
            {page.meta_description && (
              <p className="text-xl text-muted-foreground">{page.meta_description}</p>
            )}
          </header>
          
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </article>
      </main>
      
      <Footer />
    </div>
  );
}