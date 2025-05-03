
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function AdminPage() {
  const { user, isAdmin } = useUser();
  const navigate = useNavigate();
  
  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate("/login");
    }
  }, [isAdmin, navigate]);
  
  if (!isAdmin) {
    return null;
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Manage platform content and users</p>
          </div>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills Management</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Total Users</CardTitle>
                  <CardDescription>Platform learners count</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">152</p>
                  <p className="text-sm text-green-600">+12% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                  <CardDescription>Available learning paths</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">3</p>
                  <Button variant="outline" className="mt-2 text-sm">Add New Skill</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Active Discussions</CardTitle>
                  <CardDescription>Total community threads</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">24</p>
                  <p className="text-sm">12 needing moderation</p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest platform activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">New User Registration</p>
                      <p className="text-sm text-gray-500">John Smith joined the platform</p>
                    </div>
                    <p className="text-sm text-gray-500">15 minutes ago</p>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">New Discussion</p>
                      <p className="text-sm text-gray-500">UI/UX Design module discussion started</p>
                    </div>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">Module Completion</p>
                      <p className="text-sm text-gray-500">5 users completed Web Dev Module 1</p>
                    </div>
                    <p className="text-sm text-gray-500">Yesterday</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Skills</CardTitle>
                  <CardDescription>Most engaged learning paths</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <p>Web Development</p>
                      <p className="font-medium">83 learners</p>
                    </div>
                    <div className="flex justify-between">
                      <p>UI/UX Design</p>
                      <p className="font-medium">56 learners</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Data Science</p>
                      <p className="font-medium">42 learners</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Badge Distribution</CardTitle>
                  <CardDescription>Most earned achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <p>Fast Starter</p>
                      <p className="font-medium">98 awarded</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Week Streak</p>
                      <p className="font-medium">45 awarded</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Discussion Pro</p>
                      <p className="font-medium">23 awarded</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="skills">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">Skills Management</h2>
              <Button>Add New Skill</Button>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Web Development</CardTitle>
                    <CardDescription>10-week learning path</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="destructive" size="sm">Delete</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">3 modules, 9 resources</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>UI/UX Design</CardTitle>
                    <CardDescription>8-week learning path</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="destructive" size="sm">Delete</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">2 modules, 6 resources</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Data Science</CardTitle>
                    <CardDescription>12-week learning path</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="destructive" size="sm">Delete</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">2 modules, 6 resources</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="users">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">User Management</h2>
              <Button>Add User</Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 font-medium">Name</th>
                      <th className="text-left p-4 font-medium">Email</th>
                      <th className="text-left p-4 font-medium">Joined</th>
                      <th className="text-left p-4 font-medium">Progress</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-4">Alex Johnson</td>
                      <td className="p-4">alex@example.com</td>
                      <td className="p-4">Jun 14, 2023</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                            <div className="bg-skillpath-purple h-2 rounded-full" style={{ width: '70%' }}></div>
                          </div>
                          <span>70%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="destructive" size="sm">Delete</Button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4">Sarah Miller</td>
                      <td className="p-4">sarah@example.com</td>
                      <td className="p-4">Jun 20, 2023</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                            <div className="bg-skillpath-purple h-2 rounded-full" style={{ width: '45%' }}></div>
                          </div>
                          <span>45%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="destructive" size="sm">Delete</Button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4">Michael Chen</td>
                      <td className="p-4">michael@example.com</td>
                      <td className="p-4">Jul 5, 2023</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                            <div className="bg-skillpath-purple h-2 rounded-full" style={{ width: '30%' }}></div>
                          </div>
                          <span>30%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="destructive" size="sm">Delete</Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
