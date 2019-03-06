workflow "Build, Test, and Publish" {
  on = "push"
  resolves = ["GitHub Action for Docker"]
}

action "Install" {
  uses = "actions/npm@master"
  args = "install"
}

action "Build" {
  needs = "Install"
  uses = "actions/npm@master"
  args = "run build"
}

action "GitHub Action for Docker" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  needs = ["Build"]
  args = "run -t rakshans1/nodejs-yarn . git status"
}
