namespace _Apoio
{
    partial class Voluntario
    {
        /// <summary>
        /// Variável de designer necessária.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Limpar os recursos que estão sendo usados.
        /// </summary>
        /// <param name="disposing">true se for necessário descartar os recursos gerenciados; caso contrário, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Código gerado pelo Windows Form Designer

        /// <summary>
        /// Método necessário para suporte ao Designer - não modifique 
        /// o conteúdo deste método com o editor de código.
        /// </summary>
        private void InitializeComponent()
        {
            this.FotoPefil = new System.Windows.Forms.PictureBox();
            this.EditarPerfil = new System.Windows.Forms.Button();
            this.EMail = new System.Windows.Forms.Label();
            this.DataInscricao = new System.Windows.Forms.Label();
            this.TituloBeneficiario = new System.Windows.Forms.Label();
            this.NomeBeneficiario = new System.Windows.Forms.Label();
            this.TipoDoacao = new System.Windows.Forms.Label();
            this.Doação = new System.Windows.Forms.Label();
            this.Data = new System.Windows.Forms.Label();
            this.TituloData = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.FotoPefil)).BeginInit();
            this.SuspendLayout();
            // 
            // FotoPefil
            // 
            this.FotoPefil.Location = new System.Drawing.Point(56, 81);
            this.FotoPefil.Name = "FotoPefil";
            this.FotoPefil.Size = new System.Drawing.Size(100, 94);
            this.FotoPefil.TabIndex = 0;
            this.FotoPefil.TabStop = false;
            // 
            // EditarPerfil
            // 
            this.EditarPerfil.Location = new System.Drawing.Point(200, 140);
            this.EditarPerfil.Name = "EditarPerfil";
            this.EditarPerfil.Size = new System.Drawing.Size(80, 35);
            this.EditarPerfil.TabIndex = 1;
            this.EditarPerfil.Text = "Editar Perfil";
            this.EditarPerfil.UseVisualStyleBackColor = true;
            // 
            // EMail
            // 
            this.EMail.AutoSize = true;
            this.EMail.Location = new System.Drawing.Point(422, 128);
            this.EMail.Name = "EMail";
            this.EMail.Size = new System.Drawing.Size(36, 13);
            this.EMail.TabIndex = 2;
            this.EMail.Text = "E-Mail";
            this.EMail.Click += new System.EventHandler(this.EMail_Click);
            // 
            // DataInscricao
            // 
            this.DataInscricao.AutoSize = true;
            this.DataInscricao.Location = new System.Drawing.Point(422, 162);
            this.DataInscricao.Name = "DataInscricao";
            this.DataInscricao.Size = new System.Drawing.Size(86, 13);
            this.DataInscricao.TabIndex = 3;
            this.DataInscricao.Text = "Data de Incrição";
            // 
            // TituloBeneficiario
            // 
            this.TituloBeneficiario.AutoSize = true;
            this.TituloBeneficiario.Location = new System.Drawing.Point(53, 253);
            this.TituloBeneficiario.Name = "TituloBeneficiario";
            this.TituloBeneficiario.Size = new System.Drawing.Size(65, 13);
            this.TituloBeneficiario.TabIndex = 5;
            this.TituloBeneficiario.Text = "Beneficiario:";
            // 
            // NomeBeneficiario
            // 
            this.NomeBeneficiario.AutoSize = true;
            this.NomeBeneficiario.Location = new System.Drawing.Point(124, 253);
            this.NomeBeneficiario.Name = "NomeBeneficiario";
            this.NomeBeneficiario.Size = new System.Drawing.Size(35, 13);
            this.NomeBeneficiario.TabIndex = 6;
            this.NomeBeneficiario.Text = "Nome";
            this.NomeBeneficiario.Click += new System.EventHandler(this.NomeBeneficiario_Click);
            // 
            // TipoDoacao
            // 
            this.TipoDoacao.AutoSize = true;
            this.TipoDoacao.Location = new System.Drawing.Point(286, 253);
            this.TipoDoacao.Name = "TipoDoacao";
            this.TipoDoacao.Size = new System.Drawing.Size(130, 13);
            this.TipoDoacao.TabIndex = 8;
            this.TipoDoacao.Text = "O que esta sendo doado?";
            this.TipoDoacao.Click += new System.EventHandler(this.TipoDoacao_Click);
            // 
            // Doação
            // 
            this.Doação.AutoSize = true;
            this.Doação.Location = new System.Drawing.Point(235, 253);
            this.Doação.Name = "Doação";
            this.Doação.Size = new System.Drawing.Size(48, 13);
            this.Doação.TabIndex = 7;
            this.Doação.Text = "Doação:";
            // 
            // Data
            // 
            this.Data.AutoSize = true;
            this.Data.Location = new System.Drawing.Point(523, 253);
            this.Data.Name = "Data";
            this.Data.Size = new System.Drawing.Size(65, 13);
            this.Data.TabIndex = 10;
            this.Data.Text = "00/00/0000";
            this.Data.Click += new System.EventHandler(this.Data_Click);
            // 
            // TituloData
            // 
            this.TituloData.AutoSize = true;
            this.TituloData.Location = new System.Drawing.Point(479, 253);
            this.TituloData.Name = "TituloData";
            this.TituloData.Size = new System.Drawing.Size(33, 13);
            this.TituloData.TabIndex = 9;
            this.TituloData.Text = "Data:";
            // 
            // Voluntario
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.Data);
            this.Controls.Add(this.TituloData);
            this.Controls.Add(this.TipoDoacao);
            this.Controls.Add(this.Doação);
            this.Controls.Add(this.NomeBeneficiario);
            this.Controls.Add(this.TituloBeneficiario);
            this.Controls.Add(this.DataInscricao);
            this.Controls.Add(this.EMail);
            this.Controls.Add(this.EditarPerfil);
            this.Controls.Add(this.FotoPefil);
            this.Name = "Voluntario";
            this.Text = "Voluntário";
            ((System.ComponentModel.ISupportInitialize)(this.FotoPefil)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.PictureBox FotoPefil;
        private System.Windows.Forms.Button EditarPerfil;
        private System.Windows.Forms.Label EMail;
        private System.Windows.Forms.Label DataInscricao;
        private System.Windows.Forms.Label TituloBeneficiario;
        private System.Windows.Forms.Label NomeBeneficiario;
        private System.Windows.Forms.Label TipoDoacao;
        private System.Windows.Forms.Label Doação;
        private System.Windows.Forms.Label Data;
        private System.Windows.Forms.Label TituloData;
    }
}

