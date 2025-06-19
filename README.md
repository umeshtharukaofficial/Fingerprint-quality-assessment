# 🧠 Fingerprint Quality Assessment using Machine Learning

This project focuses on **automated assessment of fingerprint image quality** using advanced machine learning techniques. In biometric systems, the quality of fingerprint images significantly affects the accuracy of authentication or identification. Manual quality checks are not scalable — hence, this model evaluates fingerprint quality automatically, providing a robust solution for real-world biometric applications.

---

## 🚀 Project Overview

The goal is to **predict the quality score of fingerprint scans** using features extracted from the image. The project compares the performance of multiple algorithms including:
- **Convolutional Neural Networks (CNNs)**
- **Random Forest Regression**
- **Linear Regression**

These models are trained on pre-processed fingerprint datasets and benchmarked based on metrics such as **MSE** and **R² Score**.

---

## 🔍 Key Features

- 📈 **Quality prediction**: Automatically predict the quality score of fingerprint scans.
- 🤖 **Machine Learning models**: Implemented CNNs and regression algorithms.
- 📊 **Performance evaluation**: Visualization and evaluation of model metrics.
- 🖼️ **Image processing**: Basic image preprocessing for feature enhancement.

---

## 🧰 Technologies Used

- Python
- TensorFlow / Keras
- OpenCV
- Scikit-learn
- Matplotlib / Seaborn
- NumPy / Pandas

---

## 📁 Dataset

The dataset includes fingerprint images labeled with quality scores.  
> ⚠️ *Note: Due to license constraints, the dataset is not publicly uploaded. Please refer to publicly available fingerprint datasets or request access.*

---

## 🧪 How to Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/umeshtharukaofficial/Fingerprint-quality-assessment.git
   cd Fingerprint-quality-assessment

Here’s your requested section rewritten in proper `README.md` format (Markdown), with clean formatting and syntax for GitHub:

--


2. **Install required packages**

   ```bash
   pip install -r requirements.txt
   ```

3. **Launch the Jupyter notebook**

   ```bash
   jupyter notebook Fingerprint_quality_assessment.ipynb
   ```

---

## 📉 Sample Output

Model predictions vs actual scores are visualized using scatter plots and regression curves to evaluate performance.

---

## ✅ Results

| Model         | MSE   | R² Score |
| ------------- | ----- | -------- |
| CNN           | 0.043 | 0.91     |
| Random Forest | 0.057 | 0.88     |
| Linear Reg.   | 0.071 | 0.84     |

> 📌 **Note:** These are sample values; replace them with actual results from your model training outputs.

---

## 🧠 Future Improvements

* Incorporate larger, more diverse datasets.
* Improve generalization through data augmentation.
* Integrate the model into real-time fingerprint scanner systems.

---

## 🧑‍💻 Author

**Umesh Tharuka Malaviarachchi**

* 🔗 [LinkedIn](https://www.linkedin.com/in/umeshtharukaofficial)
* 📺 [YouTube Channel](https://www.youtube.com/@UmeshTharukaMalaviarachchi)

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and share with proper attribution.


