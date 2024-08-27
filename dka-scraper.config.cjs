module.exports = {
  apps : [{
    name   : "DKA_SCRAPER",
    script : "npm",
    args : "run start --prefix /home/dka/scraper",
    watch : true,
    cron: "0 3 * * *",
    autorestart: false
  }]
}
