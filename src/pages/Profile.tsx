
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col p-4">
      <header className="mb-4">
        <Link to="/">
          <Button variant="ghost" className="pl-0">
            <ArrowLeft className="mr-2" size={16} />
            Back to Chat
          </Button>
        </Link>
      </header>

      <Card className="mx-auto w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-center">User Profile</CardTitle>
          <CardDescription className="text-center">Manage your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-primary">U</span>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Name</p>
            <p className="text-foreground/80 bg-muted p-2 rounded">User</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Email</p>
            <p className="text-foreground/80 bg-muted p-2 rounded">user@example.com</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Specialty</p>
            <p className="text-foreground/80 bg-muted p-2 rounded">Pediatrics</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button disabled>Edit Profile</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
