from apscheduler.schedulers.blocking import BlockingScheduler

from twitter_bot import postTwitter
from line_bot import postLINE

sched = BlockingScheduler()


@sched.scheduled_job('cron', hour='7, 11, 17')
def timed_job():
    postTwitter()
    postLINE()


sched.start()
