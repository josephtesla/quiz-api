const globalThis: any = global

export default async function (): Promise<void> {
  await globalThis.mongo.stop()
}
