fn main() {
    let v = vec!["1".to_string(), "2".to_string(), "3".to_string()];
    println!("the value of v is: {:#?}", v);

    // base the index to access element will return a value(Copy trait) or a reference(NoN-Copy trait);
    // so it have to declar itseft is a reference otherwise it will throw a compile error here
    let _copy_third = &v[2]; 

    // if you want to move this element , you can use remove 、wrap_remove and pop to have the ownnership of this element
    let copy_third = v.get(3);
    println!("The third element is: {}", copy_third.expect("the vector of v is empty"));

    println!("the value of v is: {:#?}", v);
}
