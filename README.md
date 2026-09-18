# 🚜 AgroApp - Registro de Visitas Técnicas Agrícolas

O **AgroApp** é uma aplicação mobile desenvolvida para apoiar técnicos, agrônomos e auditores no registro de vistorias em propriedades rurais. O sistema opera de forma totalmente offline, utilizando os sensores do próprio dispositivo móvel para garantir a estabilidade física do aparelho, a precisão da localização geográfica e a captura de evidências fotográficas no campo.

---

## 📱 Como o App Funciona

O AgroApp conta com um painel central que monitora continuamente os sensores do dispositivo antes de autorizar o envio de uma auditoria agrícola:

1. **Indicador de Sinal GPS:** Exibe em tempo real a precisão do sinal de localização por meio de cores:
   - 🟢 **Verde:** Alta precisão (margem de erro menor que 10 metros).
   - 🟡 **Amarelo:** Média precisão (margem de erro entre 10 e 30 metros).
   - 🔴 **Vermelho:** Baixa precisão (margem de erro maior que 30 metros).
   - ⚪ **Cinza:** Sinal de GPS desativado ou em busca.

2. **Trava de Segurança por Movimento (Sensor G):** O app calcula a movimentação do aparelho em tempo real. Caso o celular sofra uma queda ou balanço brusco que ultrapasse a taxa de **2.0g**, o botão de envio é bloqueado exibindo o alerta *"Instabilidade Física Detectada"*. O usuário deve estabilizar o celular e resetar o medidor para prosseguir.

3. **Câmera Integrada:** Permite capturar a foto da vistoria. Se a permissão de acesso à câmera tiver sido negada permanentemente nas configurações do celular, o AgroApp identifica o bloqueio e exibe um botão para abrir diretamente a tela de configurações do sistema operacional.

4. **Histórico de Visitas Offline:** Todas as vistorias concluídas com sucesso são salvas na memória interna do aparelho, permitindo consultar a lista de registros passados mesmo em locais sem acesso à internet.

---

## 💻 Pré-requisitos para Rodar o Projeto

Para executar o AgroApp na sua máquina, você precisará ter instalado:

* [Node.js](https://nodejs.org/)
* [Git](https://git-scm.com/)
* Aplicativo **Expo Go** instalado no seu celular ou a extensão MobileView no vscode:
  * [Baixar na Google Play Store (Android)]
  * [Baixar na App Store (iOS)]

---

## 🚀 Passo a Passo para Executar

### 1. Baixar o projeto
Abra o terminal (Prompt de Comando ou PowerShell) e execute os comandos:


git clone [https://github.com/seu-usuario/AgroApp.git](https://github.com/seu-usuario/AgroApp.git)
cd AgroApp
abra o projeto no vscode com o comando "code ."
abra o terminal do vscode e digite o comando "npx expo start" 
abra o qrcode com o app do ExpoGo no celular ou copie a url no MobileView 
