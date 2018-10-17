#include <iostream>
using namespace std;

void helpLog() {
    cout << "WARNINGS:" << endl;
    cout << "\tMax users count is 10" << endl;
    cout << "\tNever use in options strings (or chars), be-se prog, will be crushed!" << "\n\n";
    cout << "Options:" << endl;
    cout << "\t1: Create user;" << endl;
    cout << "\t2: User list;" << endl;
    cout << "\t4: Exit from programm;" << endl;
    cout << "\t0: Repeat help-log;" << "\n\n";
}

struct UserData {
    string name;
    string pass;
    bool isAdmin;
};

class User {
    public:
        void init() {
            setName();
        }
        bool getIsAdmin() {
            return user.isAdmin;
        }
        UserData getData() {
            return user;
        }
        string getName() {
            return user.name;
        }
 
    private:
        UserData user;
        void setName() {
            cout << "Enter you'r username: ";
            cin >> user.name;
            cout << endl;
            setPassword();
        }

        void setPassword() {
            cout << "Enter you'r password: ";
            cin >> user.pass;
            cout << endl;
            setStatus();
        }

        bool setStatus() {
            if (
                ((int)(user.name[0]) == 0x66) && 
                ((int)(user.name[1]) == 0x6c) &&
                ((int)(user.name[2]) == 0x61) &&
                ((int)(user.name[3]) == 0x67)
            ) {
                user.isAdmin = true;
                cout << "Nice to see you, master!" << endl;
                cout << "Flag: Rev_en_skill_up" << endl;
                return 0;
            }

            cout << "Hello " << user.name << endl;
            cout << "You'r pass is " << user.pass << "\n\n";
            return 0;
        }
};

 
void usersLog (User list[], int size) {
    int i;
    cout << "==========================================\n";
    for (i = 0; i < size; i++) {
        cout << "User name: " << list[i].getName() << ";\n";
        cout << "This user is admin: " << list[i].getIsAdmin() ? "YES;" : "NO;";
        cout << "\n==========================================\n\n";
    }
}

void init() {
    User *db;
    db = new User[10];
    int countOfUsers = 0;

    while (true) {
        helpLog();
        cout << "And you enter: ";
        int option;
        cin >> option;
        cout << endl;
        switch (option) {
            case 1:
                db[countOfUsers++].init();
                break;
            case 2: 
                usersLog(db, countOfUsers);
                break;
            case 3:
                cout << "Cr-ed by ilya777grin23. Or in small env HyrdByrd." << "\n\n";
                break;
            case 4:
                cout << endl << "Bye, bye!" << endl;
                exit(0);
                break;  
            case 0:
                helpLog();
                break;
            default:
                cout << "That option, isn't correct!" << "\n\n";
                break;
        }
    }
}

int main() {
    init();
    return 0;
}