const axios = require('axios');

// 测试配置
const BASE_URL = 'http://localhost:3000';
const API_ENDPOINTS = {
  status: `${BASE_URL}/api/status/status`,
  test: `${BASE_URL}/api/status/test`,
  competitiveAnalysis: `${BASE_URL}/api/competitive-analysis/legacy`
};

// 测试函数
async function testAPIStatus() {
  console.log('🔍 测试API状态...');
  
  try {
    const response = await axios.get(API_ENDPOINTS.status);
    console.log('✅ API状态获取成功:');
    console.log(`   - 总Key数: ${response.data.data.totalKeys}`);
    console.log(`   - 活跃Key数: ${response.data.data.activeKeys}`);
    console.log(`   - 健康状态: ${response.data.data.summary.healthStatus}`);
    
    response.data.data.keyStatus.forEach((key, index) => {
      console.log(`   - Key ${index + 1}: ${key.keyPrefix} (活跃: ${key.isActive ? '✅' : '❌'})`);
    });
    
    return true;
  } catch (error) {
    console.error('❌ API状态获取失败:', error.response?.data?.message || error.message);
    return false;
  }
}

async function testAPIConnection() {
  console.log('\n🧪 测试API连接...');
  
  try {
    const response = await axios.post(API_ENDPOINTS.test, {
      prompt: '请用一句话介绍人工智能。'
    });
    
    console.log('✅ API连接测试成功:');
    console.log(`   - 响应时间: ${response.data.data.testResult.responseTime}ms`);
    console.log(`   - 响应长度: ${response.data.data.testResult.responseLength} 字符`);
    console.log(`   - 响应预览: ${response.data.data.testResult.responsePreview}`);
    
    return true;
  } catch (error) {
    console.error('❌ API连接测试失败:', error.response?.data?.message || error.message);
    return false;
  }
}

async function testCompetitiveAnalysis() {
  console.log('\n📊 测试竞争分析功能...');
  
  try {
    const response = await axios.post(API_ENDPOINTS.competitiveAnalysis, {
      customer_name: '测试客户',
      my_product: '我们的AI产品',
      competitor_product: '竞争对手产品'
    });
    
    console.log('✅ 竞争分析测试成功:');
    console.log(`   - 分析完成`);
    console.log(`   - 包含产品对比表: ${!!response.data.data.analysis_summary.table1}`);
    console.log(`   - 包含独有利益: ${response.data.data.analysis_summary.table2?.length || 0} 项`);
    console.log(`   - 包含策略建议: ${response.data.data.analysis_summary.strategic_recommendations?.length || 0} 项`);
    
    return true;
  } catch (error) {
    console.error('❌ 竞争分析测试失败:', error.response?.data?.message || error.message);
    return false;
  }
}

async function testLoadBalancing() {
  console.log('\n⚖️ 测试负载均衡...');
  
  const promises = [];
  const testCount = 3;
  
  for (let i = 0; i < testCount; i++) {
    promises.push(
      axios.post(API_ENDPOINTS.test, {
        prompt: `测试请求 ${i + 1}: 请简单介绍机器学习。`
      }).then(response => {
        console.log(`✅ 并发请求 ${i + 1} 成功 (${response.data.data.testResult.responseTime}ms)`);
        return { index: i + 1, success: true };
      }).catch(error => {
        console.error(`❌ 并发请求 ${i + 1} 失败: ${error.response?.data?.message || error.message}`);
        return { index: i + 1, success: false };
      })
    );
  }
  
  console.log(`🚀 发起 ${testCount} 个并发请求...`);
  const results = await Promise.all(promises);
  
  const successCount = results.filter(r => r.success).length;
  console.log(`📊 并发测试结果: ${successCount}/${testCount} 成功`);
  
  // 检查负载分布
  try {
    const statusResponse = await axios.get(API_ENDPOINTS.status);
    console.log('📈 负载分布:');
    statusResponse.data.data.keyStatus.forEach((key, index) => {
      console.log(`   - Key ${index + 1}: RPM=${key.rpm}, TPM=${key.tpm}`);
    });
  } catch (error) {
    console.error('获取负载分布失败:', error.message);
  }
  
  return successCount === testCount;
}

async function main() {
  console.log('🎯 开始双KIMI API Key功能测试\n');
  console.log('请确保：');
  console.log('1. 后端服务已启动 (npm run dev)');
  console.log('2. 已配置 KIMI_API_KEY_1 和 KIMI_API_KEY_2');
  console.log('3. API Key有足够的配额\n');
  
  const tests = [
    { name: 'API状态检查', fn: testAPIStatus },
    { name: 'API连接测试', fn: testAPIConnection },
    { name: '竞争分析功能', fn: testCompetitiveAnalysis },
    { name: '负载均衡测试', fn: testLoadBalancing }
  ];
  
  let passedTests = 0;
  
  for (const test of tests) {
    try {
      const result = await test.fn();
      if (result) {
        passedTests++;
      }
    } catch (error) {
      console.error(`💥 测试 "${test.name}" 发生异常:`, error.message);
    }
    
    // 测试间隔
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log(`\n🏁 测试完成: ${passedTests}/${tests.length} 通过`);
  
  if (passedTests === tests.length) {
    console.log('🎉 所有测试通过！双Key功能正常工作。');
    process.exit(0);
  } else {
    console.log('⚠️ 部分测试失败，请检查配置和服务状态。');
    process.exit(1);
  }
}

// 运行测试
main().catch(error => {
  console.error('💥 测试过程中发生错误:', error.message);
  process.exit(1);
});