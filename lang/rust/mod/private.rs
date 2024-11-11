mod my_mod {
  fn private_function() {
    println!("This is a private function");
  }
  pub fn public_function() {
    println!("This is a public function");
  }
  pub fn indirect_access() {
    print!("This is an indirect access: ");
    private_function();
  }
}
