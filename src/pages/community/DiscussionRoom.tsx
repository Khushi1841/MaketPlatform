import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

interface Message {
  id: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  timestamp: Date;
  room: string;
}

const DiscussionRoom = () => {
  const { user, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentRoom, setCurrentRoom] = useState('general');

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'bg-blue-100 text-blue-800';
      case 'freelancer': return 'bg-green-100 text-green-800';
      case 'company': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !isAuthenticated) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      author: {
        name: user?.name || 'Anonymous',
        avatar: user?.avatar,
        role: user?.role || 'student',
      },
      timestamp: new Date(),
      room: currentRoom,
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const filteredMessages = messages.filter(message => message.room === currentRoom);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Discussion Room</h1>

          <Tabs defaultValue="general" className="h-[600px] flex flex-col">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="student">Students</TabsTrigger>
              <TabsTrigger value="freelancer">Freelancers</TabsTrigger>
              <TabsTrigger value="company">Companies</TabsTrigger>
            </TabsList>

            {['general', 'student', 'freelancer', 'company'].map((room) => (
              <TabsContent key={room} value={room} className="flex-1 flex flex-col">
                <Card className="flex-1">
                  <CardContent className="p-4 h-[400px] overflow-y-auto space-y-4">
                    {filteredMessages.map((message) => (
                      <div key={message.id} className="flex gap-3 p-3 rounded-lg bg-gray-50">
                        <Avatar>
                          <AvatarImage src={message.author.avatar} />
                          <AvatarFallback>
                            {message.author.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{message.author.name}</span>
                            <Badge variant="outline" className={getRoleColor(message.author.role)}>
                              {message.author.role}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-gray-700 mt-1">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className="mt-4 flex gap-2">
                  <Textarea
                    placeholder={isAuthenticated ? "Type your message..." : "Please login to participate"}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    disabled={!isAuthenticated}
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!isAuthenticated}
                  >
                    Send
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default DiscussionRoom;