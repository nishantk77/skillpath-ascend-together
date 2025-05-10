
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

const interestOptions = [
  "Web Development",
  "UI/UX Design",
  "Data Science",
  "Mobile Development",
  "DevOps",
  "Blockchain",
  "Machine Learning",
  "Cloud Computing",
  "Cybersecurity",
  "Game Development",
];

const timeOptions = [
  { value: "5", label: "< 5 hours" },
  { value: "10", label: "5-10 hours" },
  { value: "20", label: "10-20 hours" },
  { value: "40", label: "20+ hours" },
];

// Create schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  interests: z.array(z.string()).min(1, { message: "Select at least one interest." }),
  weeklyTime: z.string({ required_error: "Please select your available weekly time." }),
  goals: z.array(z.string()),
});

export default function OnboardingForm() {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const [goal, setGoal] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      interests: user?.interests || [],
      weeklyTime: user?.weeklyTime?.toString() || "10",
      goals: user?.goals || [],
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Update user information
    updateUser({
      name: values.name,
      interests: values.interests,
      weeklyTime: parseInt(values.weeklyTime),
      goals: values.goals,
    });
    
    // Small delay to simulate saving
    await new Promise(resolve => setTimeout(resolve, 700));
    
    setIsSubmitting(false);
    
    toast({
      title: "Profile Updated",
      description: "Your learning profile has been saved.",
    });
    
    navigate("/dashboard");
  };
  
  const handleGoalAdd = () => {
    if (goal.trim() && !form.getValues().goals.includes(goal.trim())) {
      form.setValue("goals", [...form.getValues().goals, goal.trim()]);
      setGoal("");
    }
  };
  
  const handleGoalRemove = (goalToRemove: string) => {
    form.setValue(
      "goals", 
      form.getValues().goals.filter(g => g !== goalToRemove)
    );
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="interests"
          render={() => (
            <FormItem>
              <FormLabel>What are your interests?</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interestOptions.map((interest) => (
                  <FormField
                    key={interest}
                    control={form.control}
                    name="interests"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={interest}
                          className="flex items-start space-x-2 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(interest)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, interest])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== interest
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {interest}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="weeklyTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How much time can you dedicate weekly?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 md:grid-cols-4 gap-3"
                >
                  {timeOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`time-${option.value}`} />
                      <Label htmlFor={`time-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-3">
          <Label>What are your learning goals?</Label>
          <div className="flex gap-2">
            <Input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="E.g., Build a portfolio website"
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleGoalAdd();
                }
              }}
            />
            <Button type="button" onClick={handleGoalAdd} variant="outline">Add</Button>
          </div>
          
          {form.getValues().goals.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {form.getValues().goals.map((g, index) => (
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
    </Form>
  );
}
