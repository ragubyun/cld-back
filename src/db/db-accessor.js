const lowdb = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

class DBAccessor {
  constructor() {
      const adapter = new FileAsync(`data/data.json`);
      lowdb(adapter).then(inst => {
          this.instance = inst;
          this.instance.defaults({ tokens: [] }).write();
      });
  }

  find(path) {
    path = path
      .filter(p => p)
      .map(e => {
        if (typeof e === 'string') {
          return { key: e };
        }
        return e;
      });

    let target = this.instance;
    while (path.length) {
      const p = path.shift();
      if (!target.has(p.key).value()) {
        if (p.hasOwnProperty('default')) {
          target = target.set(p.key, p.default)
        } else {
          return undefined;
        }
      }
      target = target.get(p.key);
    }

    return target;
  }

  get(path = []) {
    const target = this.find([...path]);
    if (target) {
      return target
        .cloneDeep()
        .value();
    } else {
      return undefined;
    }
  }

  async push(path = [], value) {
      await this.find([...path])
          .push(value)
          .write();
  }

  async set(path = [], key, value) {
    await this.find([...path])
          .set(key, value)
          .write();
  }
}

module.exports = new DBAccessor();
