const ports = [];
self.onconnect = function (ev) {
  const port = ev.ports[0];
  ports.push(port);
  port.onmessage = function (e) {
    const _this = this;
    ports.forEach((p) => {
      if (p === _this) return;
      p.postMessage(e.data);
    });
  };
};
