import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  IconButton,
  Avatar,
  Divider,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  LinearProgress,
  Chip
} from '@mui/material';
import {
  Add as AddIcon,
  TrendingUp,
  TrendingDown,
  Equalizer
} from '@mui/icons-material';

const FinancialPolls = () => {
  const [newPoll, setNewPoll] = useState({
    question: '',
    options: ['', ''],
    duration: '24h'
  });
  const [polls, setPolls] = useState([
    {
      id: 1,
      user: {
        name: 'John Doe',
        avatar: '/static/images/avatar/1.jpg',
        handle: '@johndoe'
      },
      question: 'What will be the S&P 500 performance in Q1 2024?',
      options: [
        { text: 'Up 5% or more', votes: 45, percentage: 45 },
        { text: 'Up 0-5%', votes: 30, percentage: 30 },
        { text: 'Down 0-5%', votes: 15, percentage: 15 },
        { text: 'Down 5% or more', votes: 10, percentage: 10 }
      ],
      totalVotes: 100,
      timestamp: '2h ago',
      duration: '24h',
      category: 'Market Outlook'
    },
    {
      id: 2,
      user: {
        name: 'Jane Smith',
        avatar: '/static/images/avatar/2.jpg',
        handle: '@janesmith'
      },
      question: 'Which tech stock will perform best in 2024?',
      options: [
        { text: 'Apple (AAPL)', votes: 40, percentage: 40 },
        { text: 'Microsoft (MSFT)', votes: 35, percentage: 35 },
        { text: 'Amazon (AMZN)', votes: 25, percentage: 25 }
      ],
      totalVotes: 100,
      timestamp: '4h ago',
      duration: '24h',
      category: 'Stocks'
    }
  ]);
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleAddOption = () => {
    setNewPoll(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  const handleOptionChange = (index, value) => {
    setNewPoll(prev => ({
      ...prev,
      options: prev.options.map((option, i) => i === index ? value : option)
    }));
  };

  const handlePollSubmit = (e) => {
    e.preventDefault();
    if (!newPoll.question.trim() || newPoll.options.some(opt => !opt.trim())) return;

    const newPollObj = {
      id: polls.length + 1,
      user: {
        name: 'Current User',
        avatar: '/static/images/avatar/3.jpg',
        handle: '@currentuser'
      },
      question: newPoll.question,
      options: newPoll.options.map(opt => ({
        text: opt,
        votes: 0,
        percentage: 0
      })),
      totalVotes: 0,
      timestamp: 'Just now',
      duration: newPoll.duration,
      category: 'General'
    };

    setPolls([newPollObj, ...polls]);
    setNewPoll({
      question: '',
      options: ['', ''],
      duration: '24h'
    });
  };

  const handleVote = (pollId, optionIndex) => {
    if (selectedOptions[pollId] !== undefined) return;

    setPolls(polls.map(poll => {
      if (poll.id === pollId) {
        const updatedOptions = poll.options.map((option, index) => {
          if (index === optionIndex) {
            return {
              ...option,
              votes: option.votes + 1,
              percentage: ((option.votes + 1) / (poll.totalVotes + 1)) * 100
            };
          }
          return {
            ...option,
            percentage: (option.votes / (poll.totalVotes + 1)) * 100
          };
        });

        return {
          ...poll,
          options: updatedOptions,
          totalVotes: poll.totalVotes + 1
        };
      }
      return poll;
    }));

    setSelectedOptions(prev => ({
      ...prev,
      [pollId]: optionIndex
    }));
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      {/* Create Poll */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Create a New Poll</Typography>
        <form onSubmit={handlePollSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Poll Question"
                value={newPoll.question}
                onChange={(e) => setNewPoll(prev => ({ ...prev, question: e.target.value }))}
                required
              />
            </Grid>
            {newPoll.options.map((option, index) => (
              <Grid item xs={12} key={index}>
                <TextField
                  fullWidth
                  label={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddOption}
                sx={{ mr: 2 }}
              >
                Add Option
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={!newPoll.question.trim() || newPoll.options.some(opt => !opt.trim())}
              >
                Create Poll
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Polls Feed */}
      {polls.map((poll) => (
        <Card key={poll.id} sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar src={poll.user.avatar} sx={{ mr: 2 }} />
              <Box>
                <Typography variant="subtitle1" component="div">
                  {poll.user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {poll.user.handle} · {poll.timestamp}
                </Typography>
              </Box>
            </Box>

            <Typography variant="h6" sx={{ mb: 2 }}>
              {poll.question}
            </Typography>

            <Chip
              label={poll.category}
              size="small"
              sx={{ mb: 2 }}
            />

            <FormControl component="fieldset" sx={{ width: '100%' }}>
              <RadioGroup>
                {poll.options.map((option, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <FormControlLabel
                        value={index.toString()}
                        control={
                          <Radio
                            checked={selectedOptions[poll.id] === index}
                            onChange={() => handleVote(poll.id, index)}
                            disabled={selectedOptions[poll.id] !== undefined}
                          />
                        }
                        label={option.text}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
                        {option.percentage.toFixed(1)}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={option.percentage}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: 'action.hover',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4
                        }
                      }}
                    />
                  </Box>
                ))}
              </RadioGroup>
            </FormControl>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {poll.totalVotes} votes · {poll.duration} left
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default FinancialPolls; 