import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { SlideImage } from "@/hooks/useHomeContent"

interface ImageSliderProps {
  slides: SlideImage[]
  autoplay?: boolean
  autoplayDelay?: number
}

export function ImageSlider({ slides, autoplay = true, autoplayDelay = 5000 }: ImageSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-play functionality
  useEffect(() => {
    if (!autoplay || slides.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, autoplayDelay)

    return () => clearInterval(interval)
  }, [autoplay, autoplayDelay, slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  if (!slides.length) return null

  return (
    <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-lg bg-muted">
      {/* Slides */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative w-full h-full flex-shrink-0">
            <img
              src={slide.image_url}
              alt={slide.title || `Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay with content */}
            {(slide.title || slide.description || slide.link_url) && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white px-4 sm:px-8 max-w-3xl">
                  {slide.title && (
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                      {slide.title}
                    </h2>
                  )}
                  
                  {slide.description && (
                    <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 opacity-90">
                      {slide.description}
                    </p>
                  )}
                  
                  {slide.link_url && (
                    <Button 
                      size="lg" 
                      className="gap-2 min-h-[48px]"
                      onClick={() => window.open(slide.link_url, '_blank')}
                    >
                      {slide.link_text || 'Saiba mais'}
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {slides.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm min-h-[44px] min-w-[44px]"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm min-h-[44px] min-w-[44px]"
            onClick={nextSlide}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </>
      )}

      {/* Dots indicator */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all min-w-[24px] min-h-[24px] flex items-center justify-center ${
                index === currentSlide 
                  ? 'bg-white' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              onClick={() => goToSlide(index)}
            >
              <span className="sr-only">Ir para slide {index + 1}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}