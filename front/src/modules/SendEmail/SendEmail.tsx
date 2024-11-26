import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { sendPhishingEmail } from '@/services/phishingService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SendEmail = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.toast({ description: 'Please add an email address' });
      return;
    }

    try {
      await sendPhishingEmail({ email });
      navigate('/');
    } catch (error) {
      toast.toast({ description: 'Failed to send email' });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Send Phishing Email</h2>
        <form onSubmit={handleSubmit}>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email Address
          </label>
          <Input
            className="mb-4 w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
          >
            Send Email
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SendEmail;
