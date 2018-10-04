from apscheduler.schedulers.blocking import BlockingScheduler

from twitter_bot import postTwitter


def schedule():
    sched = BlockingScheduler()

    @sched.scheduled_job('cron', hour='7')
    def morning():
        postTwitter()

    @sched.scheduled_job('cron', hour='11', minute='30')
    def lunch():
        postTwitter()

    @sched.scheduled_job('cron', hour='17')
    def dinner():
        postTwitter()

    sched.start()


if __name__ == '__main__':
    schedule()
