
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { Skill, Quiz, QuizQuestion, QuizOption } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { Trash, PlusCircle, BookOpen, CircleCheck } from "lucide-react";

type QuizCreatorProps = {
  skills: Skill[];
};

export default function QuizCreator({ skills }: QuizCreatorProps) {
  const { user } = useUser();
  const [isCreating, setIsCreating] = useState(false);
  const [skillId, setSkillId] = useState("");
  const [moduleId, setModuleId] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [estimatedMinutes, setEstimatedMinutes] = useState(10);
  const [questions, setQuestions] = useState<Array<{
    text: string;
    options: { id: string; text: string }[];
    correctOptionId: string;
    explanation: string;
  }>>([
    {
      text: "",
      options: [
        { id: "opt1", text: "" },
        { id: "opt2", text: "" }
      ],
      correctOptionId: "opt1",
      explanation: ""
    }
  ]);
  
  // Get modules for selected skill
  const selectedSkill = skills.find(skill => skill.id === skillId);
  const modules = selectedSkill?.modules || [];

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        options: [
          { id: `q${questions.length + 1}-opt1`, text: "" },
          { id: `q${questions.length + 1}-opt2`, text: "" }
        ],
        correctOptionId: `q${questions.length + 1}-opt1`,
        explanation: ""
      }
    ]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const addOption = (questionIndex: number) => {
    setQuestions(
      questions.map((q, i) => {
        if (i === questionIndex) {
          return {
            ...q,
            options: [
              ...q.options,
              { id: `q${i}-opt${q.options.length + 1}`, text: "" }
            ]
          };
        }
        return q;
      })
    );
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    if (questions[questionIndex].options.length <= 2) {
      toast({
        title: "Cannot remove option",
        description: "Each question must have at least two options.",
        variant: "destructive"
      });
      return;
    }

    const newQuestions = [...questions];
    const removedOptionId = newQuestions[questionIndex].options[optionIndex].id;
    
    // Remove the option
    newQuestions[questionIndex].options = newQuestions[questionIndex].options.filter((_, i) => i !== optionIndex);
    
    // If the removed option was the correct one, set the first option as correct
    if (newQuestions[questionIndex].correctOptionId === removedOptionId) {
      newQuestions[questionIndex].correctOptionId = newQuestions[questionIndex].options[0].id;
    }
    
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index: number, text: string) => {
    setQuestions(
      questions.map((q, i) => (i === index ? { ...q, text } : q))
    );
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, text: string) => {
    setQuestions(
      questions.map((q, i) =>
        i === questionIndex
          ? {
              ...q,
              options: q.options.map((opt, j) =>
                j === optionIndex ? { ...opt, text } : opt
              )
            }
          : q
      )
    );
  };

  const handleCorrectOptionChange = (questionIndex: number, optionId: string) => {
    setQuestions(
      questions.map((q, i) =>
        i === questionIndex ? { ...q, correctOptionId: optionId } : q
      )
    );
  };

  const handleExplanationChange = (questionIndex: number, explanation: string) => {
    setQuestions(
      questions.map((q, i) =>
        i === questionIndex ? { ...q, explanation } : q
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!quizTitle || !quizDescription || !skillId || !moduleId) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if all questions have text
    if (questions.some(q => !q.text)) {
      toast({
        title: "Incomplete questions",
        description: "All questions must have text.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if all options have text
    if (questions.some(q => q.options.some(opt => !opt.text))) {
      toast({
        title: "Incomplete options",
        description: "All options must have text.",
        variant: "destructive"
      });
      return;
    }
    
    setIsCreating(true);
    
    try {
      // In a real app, we would save to database
      // For now, simulate delay and log to console
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newQuiz: Quiz = {
        id: `quiz-${Date.now()}`,
        title: quizTitle,
        description: quizDescription,
        moduleId,
        questions: questions.map(q => ({
          id: `q-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          text: q.text,
          options: q.options,
          correctOptionId: q.correctOptionId,
          explanation: q.explanation
        })),
        createdAt: new Date(),
        curatorId: user?.id || "",
        estimatedMinutes
      };
      
      console.log("Quiz created:", newQuiz);
      
      // Reset form
      setQuizTitle("");
      setQuizDescription("");
      setSkillId("");
      setModuleId("");
      setEstimatedMinutes(10);
      setQuestions([
        {
          text: "",
          options: [
            { id: "opt1", text: "" },
            { id: "opt2", text: "" }
          ],
          correctOptionId: "opt1",
          explanation: ""
        }
      ]);
      
      toast({
        title: "Quiz created",
        description: "Your quiz has been successfully created."
      });
    } catch (error) {
      toast({
        title: "Failed to create quiz",
        description: "An error occurred while creating your quiz.",
        variant: "destructive"
      });
      console.error("Error creating quiz:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="h-5 w-5 text-skillpath-purple" />
          <h2 className="text-xl font-semibold">Create a New Quiz</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="quiz-title">Quiz Title</Label>
              <Input
                id="quiz-title"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                placeholder="Enter quiz title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quiz-description">Quiz Description</Label>
              <Textarea
                id="quiz-description"
                value={quizDescription}
                onChange={(e) => setQuizDescription(e.target.value)}
                placeholder="Enter quiz description"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="skill-selector">Skill</Label>
                <Select value={skillId} onValueChange={setSkillId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select skill" />
                  </SelectTrigger>
                  <SelectContent>
                    {skills.map((skill) => (
                      <SelectItem key={skill.id} value={skill.id}>
                        {skill.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="module-selector">Module</Label>
                <Select 
                  value={moduleId} 
                  onValueChange={setModuleId}
                  disabled={!skillId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select module" />
                  </SelectTrigger>
                  <SelectContent>
                    {modules.map((module) => (
                      <SelectItem key={module.id} value={module.id}>
                        {module.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="estimated-minutes">Estimated Minutes</Label>
                <Input
                  id="estimated-minutes"
                  type="number"
                  min="1"
                  value={estimatedMinutes}
                  onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <h3 className="text-lg font-medium">Questions</h3>
            
            {questions.map((question, qIndex) => (
              <div key={qIndex} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Question {qIndex + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeQuestion(qIndex)}
                    disabled={questions.length <= 1}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`question-${qIndex}`}>Question Text</Label>
                  <Textarea
                    id={`question-${qIndex}`}
                    value={question.text}
                    onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                    placeholder="Enter question text"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Options</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => addOption(qIndex)}
                    >
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Add Option
                    </Button>
                  </div>
                  
                  <RadioGroup
                    value={question.correctOptionId}
                    onValueChange={(value) => handleCorrectOptionChange(qIndex, value)}
                  >
                    {question.options.map((option, optIndex) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.id} id={option.id} />
                        <Input
                          value={option.text}
                          onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                          placeholder={`Option ${optIndex + 1}`}
                          className="flex-1 ml-2"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeOption(qIndex, optIndex)}
                          disabled={question.options.length <= 2}
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`explanation-${qIndex}`}>Explanation (Optional)</Label>
                  <Textarea
                    id={`explanation-${qIndex}`}
                    value={question.explanation}
                    onChange={(e) => handleExplanationChange(qIndex, e.target.value)}
                    placeholder="Explain why the correct answer is correct"
                  />
                </div>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={addQuestion}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Another Question
            </Button>
          </div>
          
          <Button type="submit" className="w-full" disabled={isCreating}>
            {isCreating ? "Creating Quiz..." : "Create Quiz"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
