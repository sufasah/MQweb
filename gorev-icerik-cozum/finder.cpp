#include <string>
#include <iostream>
#include <fstream>
#include <filesystem>
#include <bitset>
#include <algorithm>
#include <vector>
#include <math.h>
#include <set>
#include <map>
using namespace std;
namespace fs = filesystem;

const string DOSYALAR_PATH = "C:\\Users\\nihaSWin\\Desktop\\kartaca\\task-parent\\gorev-icerik-cozum\\dosyalar";
const string CIKTI_PATH = "C:\\Users\\nihaSWin\\Desktop\\kartaca\\task-parent\\gorev-icerik-cozum\\gorev.txt";

vector<string> files, esit, ciftesit, sayi, wxyz;
map<string, string> charMap;

int main()
{
	charMap["11100111"] = "01100011";//ç->c
	charMap["11000111"] = "01000011";//Ç->C
	charMap["100011111"] = "01100111";//ğ->g
	charMap["100011110"] = "01000111";//Ğ->G
	charMap["100110001"] = "01101001";//ı->i
	charMap["100110000"] = "01101001";//İ->i
	charMap["11010110"] = "01001111";//Ö->O
	charMap["101011111"] = "01110011";//ş->s
	charMap["101011110"] = "01010011";//Ş->S
	charMap["11111100"] = "01110101";//ü->u
	charMap["11011100"] = "01010101";//Ü->

	fs::path dir(DOSYALAR_PATH);
	for (const auto& file : fs::directory_iterator(dir)) {
		string name = file.path().stem().string();
		string sub = name.substr(name.length() - 2, 2);
		if (sub == "==")
			ciftesit.push_back(name);
		else if (sub[1] == '=')
			esit.push_back(name);
		else if (sub[1] == '0' || sub[1] == '1' || sub[1] == '2' || sub[1] == '3' || sub[1] == '4' || sub[1] == '5')
			sayi.push_back(name);
		else if (sub[1] == 'w' || sub[1] == 'x' || sub[1] == 'y' || sub[1] == 'z')
			wxyz.push_back(name);
	}

	sort(ciftesit.begin(), ciftesit.end());
	sort(esit.begin(), esit.end());
	sort(sayi.begin(), sayi.end());
	sort(wxyz.begin(), wxyz.end());

	for (int i = 0; i < ciftesit.size(); i++) {
		files.push_back(ciftesit[i]);
		cout << ciftesit[i] << endl;
	}
	for (int i = 0; i < esit.size(); i++) {
		files.push_back(esit[i]);
		cout << esit[i] << endl;
	}
	int wxyzIndex = 0;
	int sayiIndex = 0;
	bool wxyzTurn = true;
	while (true) {
		if (wxyzTurn) {
			int count = 4;
			while (wxyzIndex < wxyz.size() && count) {
				files.push_back(wxyz[wxyzIndex]);
				cout << wxyz[wxyzIndex] << endl;
				wxyzIndex++;
				count--;
			}
			wxyzTurn = false;
		}
		else {
			int count = 6;
			while (sayiIndex < sayi.size() && count) {
				files.push_back(sayi[sayiIndex]);
				cout << sayi[sayiIndex] << endl;
				sayiIndex++;
				count--;
			}
			if (count)
				break;
			wxyzTurn = true;
		}
	}

	fstream fout(CIKTI_PATH, ios::out | ios::trunc);
	fstream fin;
	for (int i = 0; i < files.size(); i++) {
		fin = fstream(DOSYALAR_PATH + "\\" + files[i], ios::in);
		string next;
		string out;
		while (!fin.eof()) {
			fin >> next;
			if (charMap.count(next))
				out = charMap[next];
			else
				out = next;

			string fileout = "x";
			int bitIndex = 7;
			int res = 0;
			for (int j = 0; j < out.length(); j++) {
				res += (int)(out[j] - '0') * (int)pow(2, bitIndex);
				bitIndex--;
			}
			fileout[0] = (char)res;
			fout << fileout;
		}
		fin.close();
	}
	fout.close();

}
