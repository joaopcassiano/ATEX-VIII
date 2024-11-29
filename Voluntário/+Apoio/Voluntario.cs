using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace _Apoio
{
    public partial class Voluntario : Form
    {
        public Voluntario()
        {
            InitializeComponent();
        }

        private void NomeBeneficiario_Click(object sender, EventArgs e)
        {
            NomeBeneficiario = UsuarioBeneficiario;//Nome do Beneficiario.
        }

        private void TipoDoacao_Click(object sender, EventArgs e)
        {
            TipoDoacao = DescDoacao;//Descrição da Doação, o que vai ser doado.
        }

        private void Data_Click(object sender, EventArgs e)
        {
            Data = DataDoacao;//Data em que a doção foi efetuada.
        }

        private void EMail_Click(object sender, EventArgs e)
        {
            EMail = EmailUsuario;//Email
        }

        private void DataInscricao_Click(object sender, EventArgs e)
        {
            DataInscricao = DataInsUsuario;//Data da incrição do usuario.
        }
    }
}
