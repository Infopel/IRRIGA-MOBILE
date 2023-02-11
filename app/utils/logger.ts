const formatMessages = (messages: any) => {
  const [first, ...other] = messages
  return [typeof first === "string" ? first : first, ...other]
}

class Logger {
  silent: boolean = false
  private console = __DEV__ ? console.tron : console

  log(...messages: any[]): void {
    !this.silent && this.console.log(messages)
  }

  warn(...messages: any[]): void {
    !this.silent && this.console.warn(formatMessages(messages))
  }

  debug(message: any, isImportant: boolean = false){
    if(__DEV__){
      this.console.debug(message, isImportant)
    }else {
      this.console.debug(message)
    }
  }

  error(e: Error | unknown, message?: string): void {
    if (e instanceof Error) {
      !this.silent && this.console.error(e?.message ?? message, e?.stack)
    } else !this.silent && this.console.error(e, "Unknown error" ?? message)
  }

  silence(): void {
    this.silent = true
  }
}

export default new Logger()
