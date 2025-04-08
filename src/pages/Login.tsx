
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      
      if (success) {
        navigate("/dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen circular-bg flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md flex flex-col items-center">
        <div className="mb-8 text-center">
          <div className="w-32 h-32 mx-auto mb-4 relative">
            <div className="absolute inset-0 border-4 border-laundry-blue rounded-full flex items-center justify-center">
              <img 
                src="/lovable-uploads/cb422ac4-0ee2-47d0-a78d-e47492590f4e.png" 
                alt="Laundry Logo" 
                className="w-20 h-20 object-contain"
              />
            </div>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Queen's Hi-Tech</h1>
          <h2 className="text-lg font-medium text-gray-800">Laundry</h2>
        </div>
        
        <h3 className="text-2xl font-bold mb-6 text-center">SIGN IN</h3>
        
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">
              Username
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-100"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-100"
            />
          </div>
          
          <Button
            type="submit"
            className="w-full bg-laundry-blue hover:bg-laundry-darkBlue"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Login"}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <Link 
            to="/register"
            className="inline-flex items-center text-sm text-laundry-blue hover:underline"
          >
            <img 
              src="/lovable-uploads/cb422ac4-0ee2-47d0-a78d-e47492590f4e.png" 
              alt="Sign up icon" 
              className="w-4 h-4 mr-1" 
            />
            Sign with Google
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
