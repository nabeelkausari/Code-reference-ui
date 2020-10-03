import Log from '../models/Log';

export const addLog = async (userId, title) => {
  try {
    console.log({ title })
    return await new Log({ userId, title }).save()
  } catch (error) {
    console.log({ title, error })
  }
}

export const logAction = async (logId, action) => {
  try {
    let log = await Log.findById(logId).exec();
    await log.update({ actions: [...log.actions, action]})
    console.log({ title: log.title, action })
  } catch (error) {
    console.log({ error })
  }
}

export const logError = async (logId, error) => {
  try {
    let log = await Log.findById(logId).exec();
    await log.update({ error })
    console.log({ title: log.title, error })
  } catch (error) {
    console.log({ error })
  }
}
