const axios = require('axios');
const LANGUAGE_VERSIONS = require('../constants');

exports.executeCode = async (req, res) => {
  try {
    const { language, code, testcases } = req.body;
    const version = LANGUAGE_VERSIONS[language];
    if (!version) {
      throw new Error(`Unsupported language: ${language}`);
    }

    const outputs = [];
    for (const testcase of testcases) {
      const payload = {
        language,
        version,
        files: [
          {
            content: code,
          },
        ],
        stdin: testcase.input,
      };
      console.log("runnign tc")
      const response = await axios.post('https://emkc.org/api/v2/piston/execute', payload);
      outputs.push({
        input: testcase.input,
        output: response.data.run.output,
      });
    }

    res.json({ outputs });
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error('API Error:', error.response.data);
    }
    res.status(500).json({ error: `Error executing code: ${error.message}` });
  }
};