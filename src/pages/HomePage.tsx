
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Your personalized path to mastering new skills
              </h1>
              <p className="text-xl text-gray-600">
                Build customized learning roadmaps tailored to your goals, schedule, and preferences.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-skillpath-purple hover:bg-skillpath-dark-purple">
                    Get Started
                  </Button>
                </Link>
                <Link to="/explore">
                  <Button size="lg" variant="outline">
                    Explore Skills
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2074&auto=format&fit=crop" 
                alt="SkillPath learning experience" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">How SkillPath Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform helps you build structured learning paths customized to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center p-6 rounded-lg">
              <div className="bg-skillpath-pale-purple h-16 w-16 mx-auto rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-skillpath-purple">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Set Your Profile</h3>
              <p className="text-gray-600">
                Tell us about your interests, goals, and weekly availability
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg">
              <div className="bg-skillpath-pale-purple h-16 w-16 mx-auto rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-skillpath-purple">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Get Your Roadmap</h3>
              <p className="text-gray-600">
                We'll generate a personalized learning roadmap with curated resources
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg">
              <div className="bg-skillpath-pale-purple h-16 w-16 mx-auto rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-skillpath-purple">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Learn & Track Progress</h3>
              <p className="text-gray-600">
                Follow your roadmap, track your progress, and earn badges as you learn
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Popular Skills to Learn</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Start your learning journey with these in-demand skills
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1581276879432-15e50529f34b?q=80&w=2070&auto=format&fit=crop" 
                alt="Web Development" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Web Development</h3>
                <p className="text-gray-600 mb-4">
                  Learn HTML, CSS, JavaScript, and modern frameworks
                </p>
                <Link to="/explore/web-dev">
                  <Button variant="outline" className="w-full">View Roadmap</Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=2036&auto=format&fit=crop" 
                alt="UI/UX Design" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">UI/UX Design</h3>
                <p className="text-gray-600 mb-4">
                  Master interface design principles and user research methods
                </p>
                <Link to="/explore/ui-ux">
                  <Button variant="outline" className="w-full">View Roadmap</Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                alt="Data Science" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Data Science</h3>
                <p className="text-gray-600 mb-4">
                  Learn data analysis, visualization, and machine learning
                </p>
                <Link to="/explore/data-science">
                  <Button variant="outline" className="w-full">View Roadmap</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-skillpath-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to start your learning journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Create your personalized skill roadmap in minutes and start making progress toward your goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" variant="secondary">Create Your Account</Button>
            </Link>
            <Link to="/explore">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-skillpath-purple">
                Browse Skills
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
