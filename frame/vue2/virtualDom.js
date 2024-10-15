function VNode(tagName, attrs, children) {
  this.tagName = tagName;
  this.attributes = attrs;
  this.children = children;
  this.render = function () {
    const element = document.createElement(this.tagName);
    Object.keys(this.attributes).forEach(function (key) {
      element.setAttribute(key, this.attributes[key]);
    }, this);
    this.children.forEach((child) => {
      element.appendChild(child.render());
    });
    return element;
  };
}

function TextNode(content) {
  this.content = content;
  this.render = function () {
    return document.createTextNode(this.content);
  };
}

const virtualDom = new VNode('div', { class: 'container' }, [
  new TextNode('some content'),
  new VNode('span', {}, [
    new TextNode('other content'),
  ]),
]);

const body = document.querySelector('body');
body.appendChild(virtualDom.render());
