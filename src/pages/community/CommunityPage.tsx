import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Heart, Share2, Image as ImageIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

interface Post {
  id: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  createdAt: Date;
  likes: number;
  comments: number;
  image?: string;
}

// Add this after the Post interface
const samplePosts: Post[] = [
  {
    id: '1',
    content: 'Looking for React developers for a new project! Great opportunity for students.',
    author: {
      name: 'Tech Corp',
      role: 'company',
      avatar: 'https://ui-avatars.com/api/?name=Tech+Corp',
    },
    createdAt: new Date('2024-01-15'),
    likes: 15,
    comments: 5,
  },
  {
    id: '2',
    content: 'Just completed my first freelance project! Here are some key learnings...',
    author: {
      name: 'John Dev',
      role: 'freelancer',
      avatar: 'https://ui-avatars.com/api/?name=John+Dev',
    },
    createdAt: new Date('2024-01-14'),
    likes: 24,
    comments: 8,
  },
  {
    id: '3',
    content: 'Anyone interested in joining a study group for web development?',
    author: {
      name: 'Sarah Student',
      role: 'student',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Student',
    },
    createdAt: new Date('2024-01-13'),
    likes: 12,
    comments: 15,
  },
];

const CommunityPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState<Post[]>(samplePosts); // Initialize with sample posts
  const [selectedTab, setSelectedTab] = useState('all');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const filteredPosts = posts.filter(post => 
    selectedTab === 'all' || post.author.role === selectedTab
  );

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      content: newPost,
      author: {
        name: user?.name || 'Anonymous',
        avatar: user?.avatar,
        role: user?.role || 'student',
      },
      createdAt: new Date(),
      likes: 0,
      comments: 0,
      image: imageUrl,
    };

    setPosts([post, ...posts]);
    setNewPost('');
    setImageUrl('');
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'bg-blue-100 text-blue-800';
      case 'freelancer': return 'bg-green-100 text-green-800';
      case 'company': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Community Hub</h1>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => navigate('/community/discussion')}
              >
                <MessageSquare className="w-4 h-4" />
                Discussion Room
              </Button>
              {isAuthenticated && (
                <Badge variant="outline" className={getRoleColor(user?.role || '')}>
                  {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                </Badge>
              )}
            </div>
          </div>
  
          <Tabs defaultValue="all" className="mb-8" onValueChange={setSelectedTab}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="all">All Posts</TabsTrigger>
              <TabsTrigger value="student">Students</TabsTrigger>
              <TabsTrigger value="freelancer">Freelancers</TabsTrigger>
              <TabsTrigger value="company">Companies</TabsTrigger>
            </TabsList>

            {/* Create Post Form - Show on all tabs */}
            {isAuthenticated && (
              <Card className="mb-6 mt-6">
                <CardHeader>
                  <CardTitle className="text-xl">Create a Post</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Share your thoughts, questions, or ideas..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="mb-4"
                  />
                  <div className="flex items-center gap-4">
                    <Button onClick={handleCreatePost}>Post</Button>
                    <Button variant="outline" onClick={() => setImageUrl(prompt('Enter image URL') || '')}>
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Add Image
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* All Posts Tab */}
            <TabsContent value="all">
              <div className="space-y-6">
                {filteredPosts.map(post => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar>
                          <AvatarImage src={post.author.avatar} />
                          <AvatarFallback>
                            {post.author.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{post.author.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getRoleColor(post.author.role)}>
                              {post.author.role}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
  
                      <p className="text-gray-700 mb-4">{post.content}</p>
                      
                      {post.image && (
                        <img 
                          src={post.image} 
                          alt="Post attachment" 
                          className="rounded-lg mb-4 max-h-96 w-full object-cover"
                        />
                      )}
  
                      <div className="flex items-center gap-6 pt-4 border-t">
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <Heart className="w-4 h-4 mr-2" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Students Tab */}
            <TabsContent value="student">
              <div className="space-y-6">
                {filteredPosts.map(post => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar>
                          <AvatarImage src={post.author.avatar} />
                          <AvatarFallback>
                            {post.author.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{post.author.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getRoleColor(post.author.role)}>
                              {post.author.role}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
  
                      <p className="text-gray-700 mb-4">{post.content}</p>
                      
                      {post.image && (
                        <img 
                          src={post.image} 
                          alt="Post attachment" 
                          className="rounded-lg mb-4 max-h-96 w-full object-cover"
                        />
                      )}
  
                      <div className="flex items-center gap-6 pt-4 border-t">
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <Heart className="w-4 h-4 mr-2" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Freelancers Tab */}
            <TabsContent value="freelancer">
              <div className="space-y-6">
                {filteredPosts.map(post => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar>
                          <AvatarImage src={post.author.avatar} />
                          <AvatarFallback>
                            {post.author.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{post.author.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getRoleColor(post.author.role)}>
                              {post.author.role}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
  
                      <p className="text-gray-700 mb-4">{post.content}</p>
                      
                      {post.image && (
                        <img 
                          src={post.image} 
                          alt="Post attachment" 
                          className="rounded-lg mb-4 max-h-96 w-full object-cover"
                        />
                      )}
  
                      <div className="flex items-center gap-6 pt-4 border-t">
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <Heart className="w-4 h-4 mr-2" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Companies Tab */}
            <TabsContent value="company">
              <div className="space-y-6">
                {filteredPosts.map(post => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar>
                          <AvatarImage src={post.author.avatar} />
                          <AvatarFallback>
                            {post.author.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{post.author.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getRoleColor(post.author.role)}>
                              {post.author.role}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
  
                      <p className="text-gray-700 mb-4">{post.content}</p>
                      
                      {post.image && (
                        <img 
                          src={post.image} 
                          alt="Post attachment" 
                          className="rounded-lg mb-4 max-h-96 w-full object-cover"
                        />
                      )}
  
                      <div className="flex items-center gap-6 pt-4 border-t">
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <Heart className="w-4 h-4 mr-2" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default CommunityPage;