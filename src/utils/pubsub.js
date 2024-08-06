class PubSub {
  constructor() {
    this.events = {}
  }

  subscribe(evName, fn) {
    this.events[evName] = this.events[evName] || []
    this.events[evName].push(fn)
  }

  unsubscribe(evName, fn) {
    if (this.events[evName]) {
        this.events[evName] = this.events[evName].filter(f => f !== fn)
    }
  }

  publish(evName, data) {
    if (this.events[evName]) {
      this.events[evName].forEach(f => f(data))
    }
  }
}

export default new PubSub()