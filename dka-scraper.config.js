// pm2 config file 
module.exports = {
  apps : [{
    name   : "DKA_SCRAPER",
    script : "npm",
    args : "run start --prefix /home/ubuntu/dka/scraper",
    watch : true,
    cron: "*/15 * * * *"
  }]
}