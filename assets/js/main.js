class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos();
    }

    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const camposValidos = this.camposSaoValidos();
        const senhasValidas = this.senhasSaoValidas();

        if(camposValidos && senhasValidas) {
            alert('Formulário enviado');
            location.reload(); 
        }
    }

    senhasSaoValidas() {
        let valid = true;

        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.repetir');

        if(senha.value !== repetirSenha.value) {
            valid = false;
            this.criaErro(senha, 'Campos senha e repetir senha precisam ser iguais.');
            this.criaErro(repetirSenha, 'Campos senha e repetir senha precisam ser iguais.');
        }

        const limitcaracter1 = 6;
        const limitcaracter2 = 12;

        if(senha.value.length < limitcaracter1 || senha.value.length > limitcaracter2) {
            valid = false;
            this.criaErro(senha, 'Senha precisa estar entre 6 e 12 carcteres.');
        }

        return valid;
    }

    camposSaoValidos() {
        let valid = true;

        for(let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        for(let campo of this.formulario.querySelectorAll('.validar')) {
           const label = campo.previousElementSibling.innerText;

           if(!campo.value) {
              this.criaErro(campo, `Campo ${label.replaceAll(':', '')}, não pode estar em branco.`);
              valid = false;
           }

           if(campo.classList.contains('cpf')) {
              if(!this.validaCPF(campo)) valid = false;
           }

           if(campo.classList.contains('usuario')) {
              if(!this.validaUsuario(campo)) valid = false;
           }
        }

        return valid;
    }

    validaUsuario(campo) {
        const usuario = campo.value;
        const limitcaracter1 = 3;
        const limitcaracter2 = 12;
        let valid = true;

        if(usuario.length < limitcaracter1 || usuario.length >  limitcaracter2) {
            this.criaErro(campo, 'Usuário precisa ter entre 3 e 12 caracteres.')
            valid = false;
        }
        
        const numeroLetras = usuario.match(/^[a-zA-Z0-9]+$/g);

        if(!numeroLetras) {
            this.criaErro(campo, 'Nome de usuário precisar conter apenas letras e/ou números.');
            valid = false;
        }

        return valid;
    }


    validaCPF(campo) {
        const cpf = new ValidaCPF(campo.value);

        if(!cpf.valida()) {
            this.criaErro(campo, 'CPF inválido');
            return false;
        }

        return true;
    }

    criaErro(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }
}

const valida = new ValidaFormulario();