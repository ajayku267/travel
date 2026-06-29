import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export default function DriverLoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center text-3xl font-black mb-6 mx-auto shadow-sm">
          🚘
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-gray-900">Driver Portal</h1>
          <p className="text-sm text-gray-500 mt-1">Login to view your assigned rides</p>
        </div>

        <form
          action={async (formData) => {
            "use server";
            try {
              await signIn("credentials", {
                username: formData.get("username"),
                password: formData.get("password"),
                redirectTo: "/driver/dashboard",
              });
            } catch (error: any) {
              if (error.type === "CredentialsSignin") {
                redirect("/driver/login?error=CredentialsSignin");
              }
              throw error;
            }
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Mobile Number</label>
            <input
              name="username"
              type="text"
              required
              placeholder="e.g. 8392986174"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Password</label>
            <input
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 font-bold py-3.5 rounded-xl hover:bg-yellow-500 transition-colors mt-2"
          >
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
