import { Button, Card, CardContent } from "@repo/ui/components";

export function CallToAction() {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-purple-700 py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Card className="border-none bg-white/10 backdrop-blur-lg">
          <CardContent className="p-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-xl text-white/90">
              Join thousands of satisfied clients who trust Good Shepherd
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="w-full bg-white px-8 py-6 text-lg font-semibold text-blue-600 hover:bg-gray-100 sm:w-auto"
              >
                Start Your Journey
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-2 border-white bg-transparent px-8 py-6 text-lg font-semibold text-white hover:bg-white/10 sm:w-auto"
              >
                Contact Us
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
