import action from './action'

export default function (commander: any) {
  commander
    .command('get')
    .option('-r, --root [root]', 'Root')
    .action(async (args: any): Promise<void> => {
      // @ts-ignore
      await action(args)
    })
}
