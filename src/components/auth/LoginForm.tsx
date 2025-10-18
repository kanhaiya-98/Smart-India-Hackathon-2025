import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'admin' | 'department_officer' | 'field_worker'>('department_officer');
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, signup, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = isSignup 
      ? await signup({ name, email, password, role })
      : await login(email, password);
    if (!success) {
      setError(isSignup ? 'Signup failed (email may exist).' : 'Invalid credentials.');
    }
  };

  const demoAccounts = [
    { email: 'admin@civic.gov', role: 'Admin', icon: '👩‍💼' },
    { email: 'officer@civic.gov', role: 'Department Officer', icon: '👨‍🔧' },
    { email: 'worker@civic.gov', role: 'Field Worker', icon: '👷‍♂️' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Civic Admin Portal</CardTitle>
            <CardDescription>
              Sign in to manage civic issues and services
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {isSignup && (
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required={isSignup} />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@civic.gov"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {isSignup && (
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <select id="role" className="w-full border rounded h-10 px-3 bg-background" value={role} onChange={(e) => setRole(e.target.value as any)}>
                    <option value="admin">Admin</option>
                    <option value="department_officer">Department Officer</option>
                    <option value="field_worker">Field Worker</option>
                  </select>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300" 
                disabled={isLoading}
              >
                {isLoading ? (isSignup ? 'Signing up...' : 'Signing in...') : (isSignup ? 'Sign Up' : 'Sign In')}
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? 'Have an account? Sign In' : "Don't have an account? Sign Up"}
              </Button>
              
              <div className="text-sm text-muted-foreground">
                <p className="mb-2 font-medium">Demo Accounts:</p>
                <div className="space-y-1">
                  {demoAccounts.map((account, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setEmail(account.email);
                        setPassword('password');
                      }}
                      className="flex items-center gap-2 text-xs p-2 rounded hover:bg-muted/50 w-full text-left transition-colors"
                    >
                      <span>{account.icon}</span>
                      <span>{account.email}</span>
                      <span className="text-muted-foreground">({account.role})</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}