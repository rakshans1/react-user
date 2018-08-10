#!/bin/sh

set -e

if tmux has-session -t react-user 2> /dev/null; then
  tmux attach -t react-user
  exit
fi

tmux new-session -d -s react-user -n editor
tmux send-keys -t react-user:editor "vim " Enter
tmux split-window -t react-user:editor -v
tmux send-keys -t react-user:editor "gst" Enter
tmux split-window -t react-user:editor -h
tmux send-keys -t react-user:editor "yarn start" Enter
tmux resize-pane -t react-user:1.2 -D 5
tmux attach -t react-user:editor.top

