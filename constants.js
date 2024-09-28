const LANGUAGE_VERSIONS = {
  python: "3.10.0",
  java: "15.0.2",
  c: "10.2.0",
  cpp: "10.2.0"
};

const CODE_SNIPPETS = {
  python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
  java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  cpp:"",
  c:""
};


module.exports =   LANGUAGE_VERSIONS, CODE_SNIPPETS