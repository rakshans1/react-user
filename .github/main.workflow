workflow "Test" {
  on = "pull_request"
  resolves = ["Test run"]
}

action "Test run" {
  uses = "actions/npm@4633da3702a5366129dca9d8cc3191476fc3433c"
  args = "test"
}
