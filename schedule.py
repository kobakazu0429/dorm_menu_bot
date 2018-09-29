from apscheduler.schedulers.blocking import BlockingScheduler

from twitter_bot import postTwitter
from line_bot import postLINE

sched = BlockingScheduler()


@sched.scheduled_job('cron', hour='7')
def morning():
    postTwitter()
    postLINE()


@sched.scheduled_job('cron', hour='11', minute='30')
def lunch():
    postTwitter()
    postLINE()


@sched.scheduled_job('cron', hour='17')
def dinner():
    postTwitter()
    postLINE()


sched.start()
