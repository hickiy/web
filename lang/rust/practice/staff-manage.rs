use std::collections::HashMap;

#[derive(Debug)]
struct Company {
    departments: HashMap<String, Vec<String>>,
}

impl Company {
    fn add(&mut self, name: String, user: String) {
        if let Some(department) = self.departments.get_mut(&name) {
            department.push(user);
        } else {
            self.departments.insert(name, vec![user]);
        }
    }

    fn sort(&mut self) {
        for users in self.departments.values_mut() {
          users.sort();
        }
    }
}

fn main() {
    let mut company = Company {
        departments: HashMap::new(),
    };

    let vec = vec![
        String::from("Add Bob to Sales"),
        String::from("Add Salay to Engineering"),
        String::from("Add Amir to Sales"),
    ];

    for s in &vec {
        if let Some((action, rest)) = s.split_once(' ') {
            if let Some((user, department)) = rest.split_once(" to ") {
                if action == "Add" {
                    company.add(department.to_string(), user.to_string());
                }
            }
        }
    }

    company.sort();

    println!("{:#?}", company);
}
