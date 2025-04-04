import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  IconButton,
  Avatar,
  Divider,
  Chip,
  Grid,
  Paper,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Comment,
  Share,
  TrendingUp,
  TrendingDown,
  SentimentSatisfied,
  SentimentDissatisfied,
  SentimentNeutral,
  Send
} from '@mui/icons-material';

const Feed = () => {
  const [newPost, setNewPost] = useState('');
  const [newComment, setNewComment] = useState({});
  const [expandedComments, setExpandedComments] = useState({});
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: 'John Doe',
        avatar: '/static/images/avatar/1.jpg',
        handle: '@johndoe'
      },
      content: 'The market sentiment for tech stocks is showing strong bullish signals. $AAPL $MSFT $GOOGL',
      timestamp: '2h ago',
      likes: 24,
      comments: [
        {
          id: 1,
          user: {
            name: 'Jane Smith',
            avatar: '/static/images/avatar/2.jpg',
            handle: '@janesmith'
          },
          content: 'I agree! The tech sector is showing strong fundamentals.',
          timestamp: '1h ago'
        },
        {
          id: 2,
          user: {
            name: 'Mike Johnson',
            avatar: '/static/images/avatar/3.jpg',
            handle: '@mikejohnson'
          },
          content: 'What about the recent market volatility?',
          timestamp: '30m ago'
        }
      ],
      shares: 3,
      sentiment: 'bullish',
      tickers: ['AAPL', 'MSFT', 'GOOGL']
    },
    {
      id: 2,
      user: {
        name: 'Jane Smith',
        avatar: '/static/images/avatar/2.jpg',
        handle: '@janesmith'
      },
      content: 'Bearish outlook on crypto market. Expecting a correction in the coming weeks. #Bitcoin #Crypto',
      timestamp: '4h ago',
      likes: 15,
      comments: [
        {
          id: 1,
          user: {
            name: 'John Doe',
            avatar: '/static/images/avatar/1.jpg',
            handle: '@johndoe'
          },
          content: 'Interesting perspective. What indicators are you looking at?',
          timestamp: '3h ago'
        }
      ],
      shares: 2,
      sentiment: 'bearish',
      tickers: ['BTC']
    }
  ]);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const newPostObj = {
      id: posts.length + 1,
      user: {
        name: 'Current User',
        avatar: '/static/images/avatar/3.jpg',
        handle: '@currentuser'
      },
      content: newPost,
      timestamp: 'Just now',
      likes: 0,
      comments: [],
      shares: 0,
      sentiment: 'neutral',
      tickers: []
    };

    setPosts([newPostObj, ...posts]);
    setNewPost('');
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 } 
        : post
    ));
  };

  const handleCommentSubmit = (postId) => {
    if (!newComment[postId]?.trim()) return;

    const newCommentObj = {
      id: Date.now(),
      user: {
        name: 'Current User',
        avatar: '/static/images/avatar/3.jpg',
        handle: '@currentuser'
      },
      content: newComment[postId],
      timestamp: 'Just now'
    };

    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newCommentObj] } 
        : post
    ));

    setNewComment(prev => ({ ...prev, [postId]: '' }));
  };

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'bullish':
        return <TrendingUp color="success" />;
      case 'bearish':
        return <TrendingDown color="error" />;
      default:
        return <SentimentNeutral color="warning" />;
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      {/* Post Creation */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <form onSubmit={handlePostSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Share your financial insights..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <IconButton>
                    <SentimentSatisfied />
                  </IconButton>
                  <IconButton>
                    <SentimentNeutral />
                  </IconButton>
                  <IconButton>
                    <SentimentDissatisfied />
                  </IconButton>
                </Box>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={!newPost.trim()}
                >
                  Post
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Posts Feed */}
      {posts.map((post) => (
        <Card key={post.id} sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar src={post.user.avatar} sx={{ mr: 2 }} />
              <Box>
                <Typography variant="subtitle1" component="div">
                  {post.user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.user.handle} · {post.timestamp}
                </Typography>
              </Box>
            </Box>

            <Typography variant="body1" sx={{ mb: 2 }}>
              {post.content}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              {post.tickers.map((ticker) => (
                <Chip
                  key={ticker}
                  label={ticker}
                  size="small"
                  sx={{ mr: 1 }}
                />
              ))}
              <Chip
                icon={getSentimentIcon(post.sentiment)}
                label={post.sentiment}
                color={post.sentiment === 'bullish' ? 'success' : post.sentiment === 'bearish' ? 'error' : 'warning'}
                size="small"
              />
            </Box>
          </CardContent>

          <Divider />

          <CardActions sx={{ justifyContent: 'space-around' }}>
            <Button
              startIcon={post.likes > 0 ? <Favorite color="error" /> : <FavoriteBorder />}
              onClick={() => handleLike(post.id)}
            >
              {post.likes}
            </Button>
            <Button 
              startIcon={<Comment />}
              onClick={() => toggleComments(post.id)}
            >
              {post.comments.length}
            </Button>
            <Button startIcon={<Share />}>
              {post.shares}
            </Button>
          </CardActions>

          {/* Comments Section */}
          <Collapse in={expandedComments[post.id]}>
            <Box sx={{ p: 2 }}>
              <List>
                {post.comments.map((comment) => (
                  <ListItem key={comment.id} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar src={comment.user.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle2">
                            {comment.user.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                            {comment.user.handle} · {comment.timestamp}
                          </Typography>
                        </Box>
                      }
                      secondary={comment.content}
                    />
                  </ListItem>
                ))}
              </List>
              
              <Box sx={{ display: 'flex', mt: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Write a comment..."
                  value={newComment[post.id] || ''}
                  onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                  sx={{ mr: 1 }}
                />
                <IconButton 
                  color="primary" 
                  onClick={() => handleCommentSubmit(post.id)}
                  disabled={!newComment[post.id]?.trim()}
                >
                  <Send />
                </IconButton>
              </Box>
            </Box>
          </Collapse>
        </Card>
      ))}
    </Box>
  );
};

export default Feed; 