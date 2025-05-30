
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckSquare, Calendar, Users, ChevronLeft, ChevronRight } from 'lucide-react';

interface OnboardingCarouselProps {
  onGetStarted: () => void;
  onSkip: () => void;
}

export const OnboardingCarousel = ({ onGetStarted, onSkip }: OnboardingCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: CheckSquare,
      title: "Smart Task Organization",
      description: "Auto-sorting by priority and intelligent task management to keep you organized effortlessly."
    },
    {
      icon: Calendar,
      title: "Multiple Views",
      description: "Switch between List, Kanban, and Calendar views to manage tasks the way you prefer."
    },
    {
      icon: Users,
      title: "Collaboration Tools",
      description: "Comments, team assignments, and real-time collaboration to boost team productivity."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];
  const Icon = currentSlideData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TaskMaster</h1>
          <p className="text-gray-600">Smart Task Manager</p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <Icon className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">{currentSlideData.title}</h2>
              <p className="text-gray-600">{currentSlideData.description}</p>
            </div>

            <div className="flex justify-between items-center mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevSlide}
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex gap-2">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Button onClick={onGetStarted} className="w-full">
            Get Started
          </Button>
          <Button variant="outline" className="w-full">
            I already have an account
          </Button>
          <Button variant="ghost" onClick={onSkip} className="w-full">
            Skip
          </Button>
        </div>
      </div>
    </div>
  );
};
