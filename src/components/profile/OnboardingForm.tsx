
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";

const interestOptions = [
  "Web Development",
  "UI/UX Design",
  "Data Science",
  "Mobile Development",
  "DevOps",
  "Blockchain",
];

const timeOptions = [
  { value: "5", label: "< 5 hours" },
  { value: "10", label: "5-10 hours" },
  { value: "20", label: "10-20 hours" },
  { value: "40", label: "20+ hours" },
];

export default function OnboardingForm() {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || "");
  const [interests, setInterests] = useState<string[]>(user?.interests || []);
  const [weeklyTime, setWeeklyTime] = useState<string>(user?.weeklyTime?.toString() || "10");
  const [goal, setGoal] = useState("");
  const [goals, setGoals] = useState<string[]>(user?.goals || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!name || interests.length === 0 || !weeklyTime) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Update user information
    updateUser({
      name,
      interests,
      weeklyTime: parseInt(weeklyTime),
      goals
    });
    
    // Small delay to simulate saving
    await new Promise(resolve => setTimeout(resolve, 700));
    
    setIsSubmitting(false);
    
    navigate("/dashboard");
  };
  
  const handleGoalAdd = () => {
    if (goal.trim() && !goals.includes(goal.trim())) {
      setGoals([...goals, goal.trim()]);
      setGoal("");
    }
  };
  
  const handleGoalRemove = (goalToRemove: string) => {
    setGoals(goals.filter(g => g !== goalToRemove));
  };
  
  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
        />
      </div>
      
      <div className="space-y-3">
        <Label>What are your interests?</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {interestOptions.map((interest) => (
            <div key={interest} className="flex items-center space-x-2">
              <Checkbox
                id={`interest-${interest}`}
                checked={interests.includes(interest)}
                onCheckedChange={() => toggleInterest(interest)}
              />
              <label
                htmlFor={`interest-${interest}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {interest}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-3">
        <Label>How much time can you dedicate weekly?</Label>
        <RadioGroup value={weeklyTime} onValueChange={setWeeklyTime}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {timeOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`time-${option.value}`} />
                <Label htmlFor={`time-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-3">
        <Label>What are your learning goals?</Label>
        <div className="flex gap-2">
          <Input
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="E.g., Build a portfolio website"
            className="flex-1"
          />
          <Button type="button" onClick={handleGoalAdd} variant="outline">Add</Button>
        </div>
        {goals.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {goals.map((g, index) => (
              <div 
                key={index} 
                className="bg-skillpath-pale-purple text-skillpath-dark-purple px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {g}
                <button 
                  type="button" 
                  onClick={() => handleGoalRemove(g)} 
                  className="text-skillpath-dark-purple hover:text-red-500 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save & Continue"}
        </Button>
      </div>
    </form>
  );
}
