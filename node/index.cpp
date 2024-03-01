#include <node.h>

namespace demo {
  using v8::FunctionCallbackInfo;
  using v8::Isolate;
  using v8::Local;
  using v8::Object;
  using v8::Value;
  using v8::Number;
  using v8::Context;

  void Add(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    Local<Context> context = isolate->GetCurrentContext();

    double value = args[0]->NumberValue(context).ToChecked() + args[1]->NumberValue(context).ToChecked();
    args.GetReturnValue().Set(Number::New(isolate, value));
  }

  void Initialize(Local<Object> exports) {
    NODE_SET_METHOD(exports, "add", Add);
  }

  NODE_MODULE(addon, Initialize)
}