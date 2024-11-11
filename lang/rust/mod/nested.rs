mod outer_mod {
  fn private_function() {
    println!("This is a private function");
  }
  pub mod nested {
    pub fn public_function() {
      println!("This is a public function");
    }
    pub fn indirect_access() {
      println!("This is an indirect access: ");
      super::private_function();
    }
  }
}

fn main() {
  outer_mod::nested::public_function();
  outer_mod::nested::indirect_access();
}