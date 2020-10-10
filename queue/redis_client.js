const email = require('../util/email_client');

let redisConfig;

redisConfig = {
  redis: {
    port: '6379',
    host: 'localhost'
  }
};

const queue = require('kue').createQueue(redisConfig);

queue.watchStuckJobs(6000);

queue.on('ready', () => {
  // If you need to
  console.log('Queue is ready!');
});

queue.on('error', (err) => {
  // handle connection errors here
  console.error('There was an error in the main queue!');
  console.error(err);
  console.error(err.stack);
});

function createMail(data, done) {
  queue.create('mail', data)
    .priority('critical')
    .attempts(8)
    .backoff(true)
    .removeOnComplete(false)
    .save((err) => {
      if (err) {
        console.error(err);
        done(err);
      }
      if (!err) {
        done();
      }
    });
}

queue.process('mail', 8, async function(job, done){
  try{    
    const mail =  await email.sendEmail({       
      from: 'jayantmawai05@gmail.com',       
      to: 'piyuuush44@gmail.com',      
      subject: job.data.subject,       
      html: job.data.text     
    });
    done();
  }
  catch (e) {
    console.log(e);
  }
});

module.exports = {
  create: (data, done) => {
    createMail(data, done);
  }
};