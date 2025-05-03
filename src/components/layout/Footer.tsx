
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-skillpath-purple to-skillpath-light-purple rounded-lg w-8 h-8 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="font-montserrat font-bold text-xl">SkillPath</span>
            </div>
            <p className="text-gray-600">
              SkillPath helps you build personalized learning roadmaps to master new skills at your own pace.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><Link to="/explore" className="text-gray-600 hover:text-skillpath-purple">Explore Skills</Link></li>
                <li><Link to="/discussions" className="text-gray-600 hover:text-skillpath-purple">Discussions</Link></li>
                <li><Link to="/badges" className="text-gray-600 hover:text-skillpath-purple">Badge System</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Popular Skills</h3>
              <ul className="space-y-2">
                <li><Link to="/explore/web-dev" className="text-gray-600 hover:text-skillpath-purple">Web Development</Link></li>
                <li><Link to="/explore/ui-ux" className="text-gray-600 hover:text-skillpath-purple">UI/UX Design</Link></li>
                <li><Link to="/explore/data-science" className="text-gray-600 hover:text-skillpath-purple">Data Science</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-600 hover:text-skillpath-purple">About</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-skillpath-purple">Contact</Link></li>
                <li><Link to="/privacy" className="text-gray-600 hover:text-skillpath-purple">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500">© 2025 SkillPath. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-skillpath-purple">Twitter</a>
            <a href="#" className="text-gray-500 hover:text-skillpath-purple">LinkedIn</a>
            <a href="#" className="text-gray-500 hover:text-skillpath-purple">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
