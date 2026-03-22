import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Lock, Heart } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);

        const targetPass = "wedding2026";

        if (password === targetPass) {
            setTimeout(() => {
                sessionStorage.setItem("isAdmin", "true");
                toast.success("Welcome, Admin");
                navigate("/admin/dashboard");
                setLoading(false);
            }, 800);
        } else {
            setTimeout(() => {
                toast.error("Invalid credentials.");
                setLoading(false);
            }, 500);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-[#E5E1C7]/30 p-4">
            <Card className="max-w-md w-full border-2 border-[#A16C56]/20 bg-white/80 backdrop-blur-md shadow-2xl">
                <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-[#2A0306] rounded-full flex items-center justify-center mb-4">
                        <Lock className="text-[#E5E1C7] w-6 h-6" />
                    </div>
                    <CardTitle className="text-3xl font-serif text-[#2A0306]">Admin Portal</CardTitle>
                    <CardDescription className="text-[#2A0306]/60">Login to manage the guest list</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="password">Access Code</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter admin password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border-[#A16C56]/30 focus:border-[#A16C56]"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#2A0306] hover:bg-[#2A0306]/90 text-[#E5E1C7] py-6 font-serif text-lg tracking-wide uppercase transition-all duration-300"
                        >
                            {loading ? "Authenticating..." : "Login"}
                        </Button>
                    </form>

                    <div className="mt-8 text-center">
                        <Heart className="w-6 h-6 text-[#A16C56] mx-auto animate-pulse" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
